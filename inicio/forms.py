from . import models
from django import forms
from mptt.forms import TreeNodeChoiceField
from crispy_forms.helper import FormHelper
from email_validator import validate_email


class FeedbackFormNaoLogado(forms.ModelForm):
    # Form para o envio de feedback
    def __init__(self, *args, **kwargs):
        super(FeedbackFormNaoLogado, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'text-center', 'placeholder': 'Endereço de e-mail'}),
        max_length=100,
    )

    feedback = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'placeholder': 'Deixe-nos saber sua opinião', 'rows': '5'}),
        max_length=5000,
    )

    class Meta:
        model = models.Feedback
        fields = ('email', 'feedback')


class FeedbackFormLogado(forms.ModelForm):
    # Form para o envio de feedback
    def __init__(self, *args, **kwargs):
        super(FeedbackFormLogado, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False

    feedback = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'placeholder': 'Deixe-nos saber sua opinião', 'rows': '5', 'style': 'margin-top: 10px'}),
        max_length=5000,
    )

    class Meta:
        model = models.Feedback
        fields = ('feedback',)


class ComentarioForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ComentarioForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False

    comentario_pai = TreeNodeChoiceField(queryset=models.Comentario.objects.all())

    conteudo = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'rows': '5', 'maxlength': '5000', 'placeholder': 'Digite para comentar'}),
        max_length=5000,
    )

    class Meta:
        model = models.Comentario
        fields = ('conteudo', 'comentario_pai')